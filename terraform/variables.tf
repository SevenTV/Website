variable "eventapi_docker_image" {
  type    = string
  default = "ghcr.io/seventv/website:latest"
}

data "terraform_remote_state" "infra" {
  backend = "remote"

  config = {
    organization = "7tv"
    workspaces = {
      name = "7tv-infra-${trimprefix(terraform.workspace, "7tv-website-")}"
    }
  }
}

variable "seventv_domain" {
  type    = string
}
