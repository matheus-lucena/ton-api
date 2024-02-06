resource "null_resource" "docker_push" {
  provisioner "local-exec" {
    command = "bash ${path.module}/docker.sh ../ ${aws_ecr_repository.lambda.repository_url}:latest"
  }

  triggers = {
    "run_at" = timestamp()
  }

  depends_on = [
    aws_ecr_repository.lambda
  ]
}