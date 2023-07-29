resource "kubernetes_namespace" "app" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_secret" "app" {
  metadata {
    name      = "website"
    namespace = var.namespace
  }

  data = {
    "config.yaml" = templatefile("${path.module}/config.template.yaml", {
      website_url = "https://${local.infra.primary_zone}"
      gql_api_url = "https://${local.infra.secondary_zone}/v3/gql"
    })
  }
}

resource "kubernetes_deployment" "app" {
  metadata {
    name      = "website"
    namespace = kubernetes_namespace.app.metadata[0].name
    labels = {
      app = "website"
    }
  }

  timeouts {
    create = "4m"
    update = "2m"
    delete = "2m"
  }

  spec {
    selector {
      match_labels = {
        app = "website"
      }
    }

    template {
      metadata {
        labels = {
          app = "website"
        }
      }

      spec {
        container {
          name  = "website"
          image = local.image_url

          port {
            name           = "http"
            container_port = 3000
            protocol       = "TCP"
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.app.metadata[0].name
            }
          }

          resources {
            requests = {
              cpu    = "500Mi"
              memory = "100m"
            }
            limits = {
              cpu    = "100m"
              memory = "500Mi"
            }
          }

          liveness_probe {
            http_get {
              port = "http"
              path = "/"
            }
            initial_delay_seconds = 1
            timeout_seconds       = 1
            period_seconds        = 3
            success_threshold     = 1
            failure_threshold     = 8
          }

          readiness_probe {
            http_get {
              port = "http"
              path = "/"
            }
            initial_delay_seconds = 1
            timeout_seconds       = 1
            period_seconds        = 3
            success_threshold     = 1
            failure_threshold     = 8
          }

          image_pull_policy = var.image_pull_policy
        }
      }
    }
  }
}

resource "kubernetes_service" "app" {
  metadata {
    name      = "website"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    selector = {
      app = "website"
    }

    port {
      name        = "http"
      port        = 3000
      target_port = "gql"
    }
  }
}

resource "kubernetes_ingress_v1" "app" {
  metadata {
    name      = "website"
    namespace = kubernetes_namespace.app.metadata[0].name
    annotations = {
      "kubernetes.io/ingress.class"                         = "nginx"
      "external-dns.alpha.kubernetes.io/target"             = local.infra.cloudflare_tunnel_hostname
      "external-dns.alpha.kubernetes.io/cloudflare-proxied" = "true"
    }
  }

  spec {
    rule {
      host = local.infra.primary_zone
      http {
        path {
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.app.metadata[0].name
              port {
                name = "http"
              }
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_horizontal_pod_autoscaler_v2" "app" {
  metadata {
    name      = "website"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  spec {
    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.app.metadata[0].name
    }

    min_replicas = 3
    max_replicas = 8

    metric {
      type = "Resource"
      resource {
        name = "memory"
        target {
          type                = "Utilization"
          average_utilization = 60
        }
      }
    }

    metric {
      type = "Resource"
      resource {
        name = "cpu"
        target {
          type                = "Utilization"
          average_utilization = 60
        }
      }
    }

    behavior {
      scale_down {
        stabilization_window_seconds = 300
        select_policy                = "Min"
        policy {
          type           = "Pods"
          value          = 1
          period_seconds = 15
        }
      }

      scale_up {
        stabilization_window_seconds = 120
        select_policy                = "Min"
        policy {
          type           = "Pods"
          value          = 1
          period_seconds = 15
        }
      }
    }
  }
}
