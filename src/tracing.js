// import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import ot, { context, trace } from '@opentelemetry/api';
import { WebTracerProvider } from '@opentelemetry/web';
import { Resource } from '@opentelemetry/resources';
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  // BasicTracerProvider,
} from '@opentelemetry/sdk-trace-base';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

const resource = new Resource({ 'service.name': 'ot-zipkin-poc' });
const provider = new WebTracerProvider({
  resource,
  // idGenerator: {
  //   generateSpanId() {
  //     return '8f0ad7d882bc6' + (Math.random() * 1000).toString().slice(0, 2);
  //   },
  //   generateTraceId() {
  //     return '8813c256e793c6d87eb5bd6c1d5d1a48';
  //   },
  // },
});

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.addSpanProcessor(new SimpleSpanProcessor(new ZipkinExporter()));

const tracer = provider.getTracer('ot-zipkin-poc');

const span = tracer.startSpan('whole app');

// -----
const subSpan = tracer.startSpan(
  'sub function',
  {},
  trace.setSpan(context.active(), span)
);

const subSpan1 = tracer.startSpan(
  'sub function',
  {},
  trace.setSpan(context.active(), span)
);

setTimeout(() => {
  subSpan.end();
}, 3000);
setTimeout(() => {
  subSpan1.end();
}, 3000);
// -----

setTimeout(() => {
  span.end();
}, 10000);

registerInstrumentations({
  instrumentations: [new UserInteractionInstrumentation()],
  tracerProvider: provider,
});

console.log('done');
