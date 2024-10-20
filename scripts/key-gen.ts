import { crypto } from "@std/crypto";

function generateApiKey(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

const key = generateApiKey();
console.log(`
    Your new API key is:
    
        ${key}
    
`);

prompt("");