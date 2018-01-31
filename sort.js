/****************************************************************
 * 三种最为通用的排序算法
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
 * @param {Function} compFunc - compare function
 *    sample:
 *        function compFunc(a, b) {
 *            if (a > b) { return 1; }
 *            else if (a < b) { return -1 };
 *            return 0;
 *        }
 * @return sorted Array
 ****************************************************************/
function mergeSort(arr, compFunc) {
    // 补全
    let p = 0;
    let r = arr.length - 1;
    if (compFunc === undefined) {
        compFunc = (a, b) => {
            if (a > b) { return 1; }
            else if (a < b) { return -1; }
            else { return 0; }
        }
    }
    // Inner
    function mergeSortInner(arr, p, r) {
        // 归并
        function merge(arr, p, q, r) {
            let larr = arr.slice(p, q);
            let rarr = arr.slice(q, r + 1);
            let llen = larr.length;
            let rlen = rarr.length;
            for (let i = 0, j = 0, k = p; k <= r; ++k) {
                if (j >= rlen ||
                    (i < llen && compFunc(larr[i], rarr[j]) <= 0)) {
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
            mergeSortInner(arr, p, q - 1);
            mergeSortInner(arr, q, r);
            merge(arr, p, q, r);
        }

        return arr;
    }

    return mergeSortInner(arr, p, r);
}

/****************************************************************
 * 堆排序
 * 复杂度：O(nlogn)
 * 说明：是空间原址
 *******************************
 * @method heapSort
 * @param {Array} arr
 * @param {Function} compFunc - compare function
 *    sample:
 *        function compFunc(a, b) {
 *            if (a > b) { return 1; }
 *            else if (a < b) { return -1 };
 *            return 0;
 *        }
 * @return sorted Array
 ****************************************************************/
function heapSort(arr, compFunc) {
    // 补全
    if (compFunc === undefined) {
        compFunc = (a, b) => {
            if (a > b) { return 1; }
            else if (a < b) { return -1; }
            else { return 0; }
        }
    }
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
        if (l < arr.heapSize && compFunc(arr[l], arr[maxIdx]) > 0) {
            maxIdx = l;
        }
        if (r < arr.heapSize && compFunc(arr[r], arr[maxIdx]) > 0) {
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
 * @param {Function} compFunc - compare function
 *    sample:
 *        function compFunc(a, b) {
 *            if (a > b) { return 1; }
 *            else if (a < b) { return -1 };
 *            return 0;
 *        }
 * @return sorted Array
 ****************************************************************/
function quickSort(arr, compFunc) {
    // 补全
    let p = 0;
    let r = arr.length - 1;
    if (compFunc === undefined) {
        compFunc = (a, b) => {
            if (a > b) { return 1; }
            else if (a < b) { return -1; }
            else { return 0; }
        }
    }
    // Inner
    function quickSortInner(arr, p, r) {
        // 按与arr[r]比较进行分列
        function partition(arr, p, r) {
            let i = p - 1;
            for (let j = p; j < r; ++j) {
                // 将小于arr[r]的元素交换到i后面的位置
                if (compFunc(arr[j], arr[r]) < 0) {
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
            quickSortInner(arr, p, q - 1);
            quickSortInner(arr, q + 1, r);
        }

        return arr;
    }

    return quickSortInner(arr, p, r);
}

/****************************************************************/
exports.mergeSort = mergeSort;
exports.heapSort  = heapSort;
exports.quickSort = quickSort;
