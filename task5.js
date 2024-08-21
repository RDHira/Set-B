function countSmaller(nums) {
    const counts = new Array(nums.length).fill(0);
    const indices = Array.from(nums.keys());

    const mergeSort = (left, right) => {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);

        merge(left, mid, right);
    };

    const merge = (left, mid, right) => {
        let i = left, j = mid + 1;
        let temp = [];
        let count = 0;

        for (let k = left; k <= right; k++) {
            temp[k] = indices[k];
        }

        let iTemp = left, jTemp = mid + 1;

        for (let k = left; k <= right; k++) {
            if (iTemp <= mid && (jTemp > right || nums[temp[iTemp]] <= nums[temp[jTemp]])) {
                counts[temp[iTemp]] += count;
                indices[k] = temp[iTemp++];
            } else {
                count++;
                indices[k] = temp[jTemp++];
            }
        }
    };

    mergeSort(0, nums.length - 1);

    return counts;
}

// Example usage
const nums = [5, 2, 6, 1];
console.log(countSmaller(nums)); // Output: [2, 1, 1, 0]
