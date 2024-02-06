resource "aws_cognito_user_pool" "pool" {
  name = var.name
  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
  username_attributes = [
    "email",
  ]
}

resource "aws_cognito_user_pool_client" "client" {
  name = "app-${var.name}"

  user_pool_id = aws_cognito_user_pool.pool.id

  explicit_auth_flows = ["ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
  generate_secret     = true

  access_token_validity  = 24
  refresh_token_validity = 720
}
