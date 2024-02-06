resource "aws_dynamodb_table" "shop" {
  name         = var.shop_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = local.table_shop_gsi_key
    type = "S"
  }

  global_secondary_index {
    name            = local.table_shop_gsi_name
    hash_key        = local.table_shop_gsi_key
    projection_type = "ALL"
  }
}

resource "aws_dynamodb_table" "products" {
  name         = var.products_table_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "sn"

  attribute {
    name = "sn"
    type = "S"
  }

  attribute {
    name = local.table_products_gsi_key
    type = "S"
  }

  global_secondary_index {
    name            = local.table_products_gsi_name
    hash_key        = local.table_products_gsi_key
    projection_type = "ALL"
  }
}