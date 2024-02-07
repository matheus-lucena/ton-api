FROM public.ecr.aws/lambda/nodejs:20 as builder
WORKDIR /root/
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --omit=dev --non-interactive
COPY ./src/ ${LAMBDA_TASK_ROOT}
RUN ["npm", "run", "build", "outdir", "./dist"]

FROM public.ecr.aws/lambda/nodejs:20
COPY --from=builder /root/dist ${LAMBDA_TASK_ROOT}
CMD [ "aws.handler" ]
