/****************************************************************
 * 三种最为实用的排序算法
 * 1）归并排序
 * 2）堆排序
 * 3）快速排序
 ****************************************************************/
"use strict"

/****************************************************************
 * 归并排序
 * 复杂度：O(nlogn)
 * 说明：非空间原址
 *******************************
 * @method mergeSort
 * @param {Array} arr
 * @param {Number} p - begin index
 * @param {Number} r - end index
 * @return sorted Array
 ****************************************************************/
function mergeSort(arr, p, r) {
    // 补全index
    if (p === undefined) { p = 0; }
    if (r === undefined) { r = arr.length - 1; }
    // 归并
    function merge(arr, p, q, r) {
        let larr = arr.slice(p, q);
        let rarr = arr.slice(q, r + 1);

        larr.push(Number.POSITIVE_INFINITY);
        rarr.push(Number.POSITIVE_INFINITY);

        for (let i = 0, j = 0, k = p; k <= r; ++k) {
            if (larr[i] <= rarr[j]) {
                arr[k] = larr[i];
                ++i;
            } else {
                arr[k] = rarr[j];
                ++j;
            }
        }
    }
    // 递归
    if (p < r) {
        let q = parseInt((p + r) / 2) + 1;
        mergeSort(arr, p, q - 1);
        mergeSort(arr, q, r);
        merge(arr, p, q, r);
    }

    return arr;
}

/****************************************************************
 * 堆排序
 * 复杂度：O(nlogn)
 * 说明：是空间原址
 *******************************
 * @method heapSort
 * @param {Array} arr
 * @return sorted Array
 ****************************************************************/
function heapSort(arr) {
    // 保序
    function keepMaxHeap(arr, i) {
        function parentIdx(i) {
            return parseInt(i / 2);
        }
        function leftIdx(i) {
            return i * 2;
        }
        function rightIdx(i) {
            return i * 2 + 1;
        }

        let l = leftIdx(i);
        let r = rightIdx(i);
        let maxIdx = i;
        if (l < arr.heapSize && arr[l] > arr[i]) {
            maxIdx = l;
        }
        if (r < arr.heapSize && arr[r] > arr[maxIdx]) {
            maxIdx = r;
        }
        // 交换最大值到父节点
        if (maxIdx !== i) {
            let temp = arr[i];
            arr[i] = arr[maxIdx];
            arr[maxIdx] = temp;
            // 递归对子节点再做校验
            keepMaxHeap(arr, maxIdx);
        }
    }
    // 建堆
    function buildHeap(arr) {
        arr.heapSize = arr.length;
        for (let i = parseInt(arr.heapSize / 2); i >= 0; --i) {
            keepMaxHeap(arr, i);
        }
    }

    buildHeap(arr);
    for (let i = arr.length - 1; i >= 0; --i) {
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        // 循环保序
        --arr.heapSize;
        keepMaxHeap(arr, 0);
    }
    // 清理辅助属性
    delete arr.heapSize;

    return arr;
}

/****************************************************************
 * 快速排序
 * 期望复杂度：O(nlogn)
 * 最坏复杂度：O(n^2)
 * 说明：是空间原址
 *******************************
 * @method quickSort
 * @param {Array} arr
 * @param {Number} p - begin index
 * @param {Number} r - end index
 * @return sorted Array
 ****************************************************************/
function quickSort(arr, p, r) {
    // 补全index
    if (p === undefined) { p = 0 }
    if (r === undefined) { r = arr.length - 1 }
    // 按与arr[r]比较进行分列
    function partition(arr, p, r) {
        let i = p - 1;
        for (let j = p; j < r; ++j) {
            // 将小于arr[r]的元素交换到i后面的位置
            if (arr[j] < arr[r]) {
                ++i;
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        // 将arr[r]元素交换到i后的位置
        ++i;
        let temp = arr[r];
        arr[r] = arr[i];
        arr[i] = temp;
        return i;
    }

    if (p < r) {
        // 分列
        let q = partition(arr, p, r);
        // 再分别对左右两组元素递归快排
        quickSort(arr, p, q - 1);
        quickSort(arr, q + 1, r);
    }

    return arr;
}

/****************************************************************/
exports.mergeSort = mergeSort;
exports.heapSort  = heapSort;
exports.quickSort = quickSort;
