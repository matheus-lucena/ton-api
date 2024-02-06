resource "docker_image" "lambda" {
  name = aws_ecr_repository.lambda.repository_url
  build {
    context = "../"
    tag     = [local.image_tag]
  }
}


resource "null_resource" "docker_push" {
  provisioner "local-exec" {
    command = <<EOF
	    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${data.aws_caller_identity.current.account_id}.dkr.ecr.us-east-1.amazonaws.com
	    docker push "${local.image_tag}"
	    EOF
  }

  triggers = {
    "run_at" = timestamp()
  }

  depends_on = [
    aws_ecr_repository.lambda,
    docker_image.lambda
  ]
}