locals {
  table_shop_gsi_name = "client-index"
  table_shop_gsi_key  = "client_id"

  table_products_gsi_name = "active-index"
  table_products_gsi_key  = "active"
}

## Lambda
locals {
  environment = {
    COGNITO_CLIENT_ID    = aws_cognito_user_pool_client.client.id
    COGNITO_USER_POOL_ID = aws_cognito_user_pool.pool.id
    COGNITO_SECRET       = aws_cognito_user_pool_client.client.client_secret

    DYNAMODB_PRODUCTS_TABLE        = var.products_table_name
    DYNAMODB_PRODUCTS_ACTIVE_GSI   = local.table_products_gsi_name
    DYNAMODB_SHOP_TABLE            = var.shop_table_name
    DYNAMODB_SHOP_TABLE_CLIENT_GSI = local.table_shop_gsi_name
  }
}


## docker
locals {
  account_id       = data.aws_caller_identity.current.account_id
  region           = "us-east-1"
  docker_image_tag = var.github_run_number
}