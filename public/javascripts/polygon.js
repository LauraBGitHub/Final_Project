
import Moralis from 'moralis';

try {
  await Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjIwYTg1Yzc2LTdmN2YtNGQ4NC1iN2ZmLTUyNGI0MTM4NjMxNCIsIm9yZ0lkIjoiMzQ0Nzk5IiwidXNlcklkIjoiMzU0NDUxIiwidHlwZUlkIjoiMWQ2Y2QzNWYtZjRhYi00YzNjLWI3ZWEtNmIzMGJkZmM3MzRiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODc0Mjc1NDAsImV4cCI6NDg0MzE4NzU0MH0.BpFzS01rvP-DDefh6pfKGuD-th6bZ2UcHrPHHoiavtg"
  });

  const response = await Moralis.EvmApi.balance.getNativeBalance({
    "chain": "0x13881",
    "address": "0xF805AB418257291580898b00D4F9Ae4F94489ddc"
  });

  console.log("POlygon"+response.raw);
} catch (e) {
  console.error(e);
}
