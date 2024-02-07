resource "aws_iam_role" "lambda" {
  name = var.name

  assume_role_policy = jsonencode({
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_policy_attachment" "lambda_basic_access" {
  name       = "lambda_basic_access"
  roles      = [aws_iam_role.lambda.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy_attachment" "cognito_access" {
  name       = "cognito_access"
  roles      = [aws_iam_role.lambda.name]
  policy_arn = "arn:aws:iam::aws:policy/AmazonCognitoPowerUser"
}


resource "aws_iam_policy_attachment" "dynamodb_access" {
  name       = "dynamodb_access"
  roles      = [aws_iam_role.lambda.name]
  policy_arn = aws_iam_policy.dynamodb.arn
}

resource "aws_iam_policy" "dynamodb" {
  name        = "${var.name}-dynamo"
  
  policy = data.aws_iam_policy_document.dynamodb.json
}

data "aws_iam_policy_document" "dynamodb" {
  statement {

    actions = [
      "dynamodb:Describe*",
      "dynamodb:List*",
      "dynamodb:Get*",
      "dynamodb:DeleteItem",
      "dynamodb:PartiQLSelect",
      "dynamodb:UpdateTimeToLive",
      "dynamodb:ConditionCheckItem",
      "dynamodb:PutItem",
      "dynamodb:Scan",
      "dynamodb:Query",
      "dynamodb:UpdateItem",
    ]

    resources = aws_dynamodb_table[*].arn
  }
}