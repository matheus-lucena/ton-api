resource "null_resource" "docker_push" {
  provisioner "local-exec" {
    command = <<EOF
	    aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${local.account_id}.dkr.ecr.${local.region}.amazonaws.com
	    docker build -t "${aws_ecr_repository.lambda.repository_url}:latest"  ../
        docker push "${aws_ecr_repository.lambda.repository_url}:latest"
	    EOF
  }

  triggers = {
    "run_at" = timestamp()
  }

  depends_on = [
    aws_ecr_repository.lambda
  ]
}