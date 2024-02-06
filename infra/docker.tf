resource "docker_image" "lambda" {
  name = aws_ecr_repository.lambda.repository_url
  build {
    context = "../"
    tag     = ["${aws_ecr_repository.lambda.repository_url}:latest"]
  }
}


resource "null_resource" "docker_push" {
	  provisioner "local-exec" {
	    command = <<EOF
	    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${data.aws_caller_identity.current.account_id}.dkr.ecr.us-east-1.amazonaws.com
	    docker push "${aws_ecr_repository.lambda.repository_url}:latest"
	    EOF
	  }
	
	  triggers = {
	    "run_at" = plantimestamp()
	  }

	  depends_on = [
	    aws_ecr_repository.lambda,
	  ]
}