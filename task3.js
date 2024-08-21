function longestConsecutiveChain(nums) {
    if (nums.length === 0) return 0;

    // Step 1: Convert array to a set
    const numSet = new Set(nums);
    let longestChainLength = 0;

    // Step 2: Iterate over the set
    numSet.forEach(num => {
        // Check if it's the start of a sequence
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentChainLength = 1;

            // Expand the sequence
            while (numSet.has(currentNum + 1)) {
                currentNum++;
                currentChainLength++;
            }

            // Update the longest chain length
            longestChainLength = Math.max(longestChainLength, currentChainLength);
        }
    });

    return longestChainLength;
}

// Example usage
const nums = [100, 4, 200, 1, 3, 2];
console.log(longestConsecutiveChain(nums)); // Output: 4
