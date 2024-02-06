terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.35.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

terraform {
  backend "s3" {
    bucket = "stone-test-terraform-state"
    region = "us-east-1"
    key    = "terraform"
  }
}