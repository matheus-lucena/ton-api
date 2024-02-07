FROM public.ecr.aws/lambda/nodejs:20 as builder
WORKDIR /root
COPY ["package.json", "package-lock.json", "."]
RUN npm install --non-interactive
COPY . .
RUN ["npx", "tsc"]

FROM public.ecr.aws/lambda/nodejs:20
COPY --from=builder /root/dist ${LAMBDA_TASK_ROOT}
CMD [ "src.aws.handler" ]
