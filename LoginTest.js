import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate';

  const payload = JSON.stringify({
    _token: '2b5d01feb30948ed15755.tJaAnusCDBNyzqFkOSsmBoakDmr1i9sYnoyubfZ8GqE.99q0qo96YVUT_84HTUlycbDMaSS-w60p1-WaA4YLTfXg-PSuvlZ8fkStzg',
    username: 'Admin',
    password: 'admin123'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
  console.log(res.body);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'contains dashboard or redirect': (r) => r.body.includes('dashboard') || r.status === 302,
  });

  sleep(1);
}

// ✅ Generate nice HTML report
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
