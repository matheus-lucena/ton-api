FROM public.ecr.aws/lambda/nodejs:20 as builder
WORKDIR /root
COPY ["package.json", "package-lock.json", "."]
RUN npm install --non-interactive
COPY . .
RUN ["npx", "tsc"]

FROM public.ecr.aws/lambda/nodejs:20
COPY --from=builder /root/dist ${LAMBDA_TASK_ROOT}
COPY --from=builder /root/package*.json ${LAMBDA_TASK_ROOT}
RUN npm install --omit=dev --non-interactive
CMD [ "aws.handler" ]
