FROM public.ecr.aws/lambda/nodejs:20

COPY ./package.json ${LAMBDA_TASK_ROOT}/
COPY ./package-lock.json ${LAMBDA_TASK_ROOT}/
COPY ./src/ ${LAMBDA_TASK_ROOT}
WORKDIR ${LAMBDA_TASK_ROOT}
RUN npm install --omit=dev --non-interactive

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "aws.handler" ]