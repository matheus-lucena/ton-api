resource "aws_apigatewayv2_api" "main" {
  name          = var.name
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "default" {
  api_id               = aws_apigatewayv2_api.main.id
  integration_type     = "AWS_PROXY"
  connection_type      = "INTERNET"
  integration_method   = "ANY"
  integration_uri      = aws_lambda_function.main.invoke_arn
  timeout_milliseconds = 30000
}

resource "aws_apigatewayv2_route" "main" {
  api_id             = aws_apigatewayv2_api.main.id
  route_key          = "ANY /{proxy+}"
  authorization_type = "NONE"
  target             = "integrations/${aws_apigatewayv2_integration.default.id}"
}

resource "aws_apigatewayv2_stage" "main" {
  api_id = aws_apigatewayv2_api.main.id
  name   = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.main.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.main.execution_arn}/*"
}