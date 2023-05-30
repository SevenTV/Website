variable "docker_image" {
  type = string
}

variable "namespace" {
  type    = string
  default = "website"
}

variable "max_replicas" {
  type   = number
  default = 10
}

variable "min_replicas" {
  type   = number
  default = 5
}

variable "seventv_domain" {
  type    = string
}
