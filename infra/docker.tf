resource "docker_image" "ubuntu" {
  name = aws_ecr_repository.lambda.repository_url
  build {
    context = "../"
    tag     = ["${aws_ecr_repository.lambda.repository_url}:latest"]
  }
}