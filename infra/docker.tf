resource "docker_image" "lambda" {
  name = aws_ecr_repository.lambda.repository_url
  build {
    context = "../"
    tag     = ["${aws_ecr_repository.lambda.repository_url}:latest"]
  }
}