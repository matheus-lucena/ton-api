resource "aws_lambda_function" "profile_faker_function" {
  function_name = var.name
  timeout       = 15 # seconds
  image_uri     = aws_ecr_repository.lambda.repository_url
  package_type  = "Image"

  role = aws_iam_role.lambda.arn

  publish = true

  environment {
    variables = local.environment
  }
}