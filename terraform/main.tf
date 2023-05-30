terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "7tv"

    workspaces {
      prefix = "7tv-website-"
    }
  }
}

locals {
  workspace = trimprefix(terraform.workspace, "7tv-website-")
}

module "eventapi" {
  source                      = "./website"
  docker_image = var.eventapi_docker_image
  max_replicas = local.workspace == "prod" ? 10 : 1
  min_replicas = local.workspace == "prod" ? 5 : 1
  seventv_domain = var.seventv_domain
}
