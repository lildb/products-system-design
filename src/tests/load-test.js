import http from 'k6/http';
import {check, sleep} from 'k6';



export let options = {
  // vus: 10,
  // duration: '5s',
  stages: [
    { duration: '5s', target: 100 },
    { duration: '10s', target: 100 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<5'],
  }
}

export default function() {
  // const res = http.get('http://localhost:3000/api/v1/product/52648/styles');
  const res = http.get('http://18.217.96.105/api/v1/product/52648/styles');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(.5)

}