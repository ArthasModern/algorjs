const Sort = require("./sort");

//**************** 正序
console.log(Sort.mergeSort([6, 8, 4, 3, 2, 7, 5, 1, 9, 0]));
console.log(Sort.heapSort([6, 8, 4, 3, 2, 7, 5, 1, 9, 0]));
console.log(Sort.quickSort([6, 8, 4, 3, 2, 7, 5, 1, 9, 0]));

//**************** 倒序
const reverseCompFunc = (a, b) => {
    if (a > b) { return -1; }
    else if (a < b) { return 1; }
    else { return 0; }
};
console.log(Sort.mergeSort([6, 8, 4, 3, 2, 7, 5, 1, 9, 0], reverseCompFunc));
console.log(Sort.heapSort([6, 8, 4, 3, 2, 7, 5, 1, 9, 0], reverseCompFunc));
console.log(Sort.quickSort([6, 8, 4, 3, 2, 7, 5, 1, 9, 0], reverseCompFunc));

//**************** 自定义比较方法
const oldCompFunc = function(a, b) {
    // 按年岁从大到小 ---- 长者优先
    if (a.age > b.age) { return -1; }
    else if (a.age < b.age) { return 1; }
    else { return 0; }
};

const man0 = { age: 3 };
const man1 = { age: 10 };
const man2 = { age: 20 };
const man3 = { age: 32 };
const man4 = { age: 45 };
const man5 = { age: 60 };

console.log(Sort.mergeSort([man3, man0, man5, man2, man1, man4], oldCompFunc));
console.log(Sort.heapSort([man3, man0, man5, man2, man1, man4], oldCompFunc));
console.log(Sort.quickSort([man3, man0, man5, man2, man1, man4], oldCompFunc));