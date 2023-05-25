var myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.api+json");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");

export const getLastBlockNumber1 = async () => {
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch("https://mainnet-api.explorer.nervos.org/api/v1/statistics/tip_block_number", requestOptions);
  if (!response.ok)
    throw new Error('Network response was not ok');

  const result = await response.json();

  return result.data.attributes.tip_block_number;
}