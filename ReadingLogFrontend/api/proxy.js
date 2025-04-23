// api/proxy.js
const axios = require('axios');

export default async function handler(req, res) {
  const { query } = req;  // 클라이언트에서 보낸 쿼리 파라미터를 가져옴
  
  try {
    // 알라딘 API 요청을 보냄
    const response = await axios.get('https://www.aladin.co.kr/ttb/api', {
      params: {
        ttbkey: process.env.VITE_ALADIN_API,  // 환경 변수에서 API 키 가져오기
        ...query,  // 클라이언트에서 전달된 쿼리 파라미터를 그대로 전달
      },
    });
    
    // 알라딘 API 응답을 클라이언트로 전달
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    res.status(500).json({ error: 'API 호출 중 오류 발생' });
  }
}
