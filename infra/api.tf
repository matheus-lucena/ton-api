resource "aws_apigatewayv2_api" "main" {
  name          = var.name
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "main" {
  api_id           = aws_apigatewayv2_api.main.id
  integration_type = "HTTP_PROXY"

  integration_method = "ANY"
  integration_uri    = aws_lambda_function.main.invoke_arn
}