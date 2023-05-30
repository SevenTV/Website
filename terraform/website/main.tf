resource "kubernetes_namespace" "website" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_deployment" "website" {
  metadata {
    name = "website"
    labels = {
      app = "website"
    }
    namespace = kubernetes_namespace.website.metadata[0].name
  }

  timeouts {
    create = "2m"
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
          name              = "website"
          image             = var.docker_image
          image_pull_policy = "Always"
          port {
            container_port = 3000
            name           = "http"
          }
          readiness_probe {
            initial_delay_seconds = 5
            period_seconds        = 5
            tcp_socket {
              port = "http"
            }
          }
          liveness_probe {
            initial_delay_seconds = 5
            period_seconds        = 5
            tcp_socket {
              port = "http"
            }
          }
          startup_probe {
            initial_delay_seconds = 5
            period_seconds        = 5
            tcp_socket {
              port = "http"
            }
          }
          security_context {
            allow_privilege_escalation = false
            privileged                 = false
            read_only_root_filesystem  = true
            run_as_non_root            = true
            run_as_user                = 1000
            run_as_group               = 1000
            capabilities {
              drop = ["ALL"]
            }
          }
          resources {
            limits = {
              "cpu"    = "100m"
              "memory" = "512Mi"
            }
            requests = {
              "cpu"    = "100m"
              "memory" = "256Mi"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "website" {
  metadata {
    name      = "website"
    namespace = kubernetes_namespace.website.metadata[0].name
  }

  spec {
    selector = {
      app = "website"
    }
    port {
      name = "http"
      port = 3000
      target_port = "http"
    }
  }
}

resource "kubernetes_horizontal_pod_autoscaler_v2" "website" {
  metadata {
    name      = "website"
    namespace = kubernetes_namespace.website.metadata[0].name
  }

  spec {
    max_replicas = var.max_replicas
    min_replicas = var.min_replicas
    scale_target_ref {
      api_version = "apps/v1"
      kind        = "Deployment"
      name        = kubernetes_deployment.website.metadata[0].name
    }
    metric {
      type = "Resource"
      resource {
        name = "memory"
        target {
          type                = "Utilization"
          average_utilization = 75
        }
      }
    }
    metric {
      type = "Resource"
      resource {
        name = "cpu"
        target {
          type                = "Utilization"
          average_utilization = 75
        }
      }
    }
  }
}

resource "kubernetes_ingress_v1" "website" {
  metadata {
    name      = "website"
    namespace = kubernetes_namespace.website.metadata[0].name
    annotations = {
      "external-dns.alpha.kubernetes.io/hostname" = "${var.seventv_domain}"
      "kubernetes.io/ingress.class"               = "nginx"
      "cert-manager.io/cluster-issuer"            = "cloudflare"
    }
  }
  spec {
    rule {
      host = var.seventv_domain
      http {
        path {
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.website.metadata[0].name
              port {
                name = "http"
              }
            }
          }
        }
      }
    }
    tls {
      hosts       = [var.seventv_domain]
      secret_name = "website-tls"
    }
  }
}
