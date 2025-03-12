add = (num1, num2) => {
    return `This is add function: ${num1} + ${num2} = ${Number(num1) + Number(num2)}`;

}
sub = (num1, num2) => {
    return `This is sub function: ${num1} - ${num2} = ${Number(num1) - Number(num2)}`;

}
multi = (num1, num2) => {
    return `This is multi function: ${num1} * ${num2} = ${Number(num1) * Number(num2)}`;
}
div = (num1, num2) => {
    return `This is div function: ${num1} / ${num2} = ${Number(num1) / Number(num2)}`;
}
module.exports = {
    add: add,
    sub: sub,
    multi: multi,
    div: div
}