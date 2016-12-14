
export const  randRange = (low,high) => (Math.floor(Math.random()*(high - low)) + low);

export const  randDeg = () => {
  let mark = Math.random() > 0.5? '+' :'-';
  return mark + Math.ceil(Math.random()*30);
};
