FROM public.ecr.aws/lambda/nodejs:20

COPY ./package.json ${LAMBDA_TASK_ROOT}/
COPY ./package-lock.json ${LAMBDA_TASK_ROOT}/

RUN cd ${LAMBDA_TASK_ROOT}/ && npm install --production --non-interactive
  
# Copy function code
COPY ./src/ ${LAMBDA_TASK_ROOT}

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "src.aws.handler" ]