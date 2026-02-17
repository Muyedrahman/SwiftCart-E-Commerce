1) What is the difference between null and undefined?
null: প্রোগ্রামারের ইচ্ছা অনুযায়ী কোনো value deliberately খালি করা হয়েছে।
undefined: ভেরিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু মান নেই। (JS স্বয়ংক্রিয়ভাবে assign করে)

2) What is the use of the map() function in JavaScript? How is it different from forEach()?
map(): প্রতিটি element নিয়ে নতুন array তৈরি করে। মূল array অপরিবর্তিত।

forEach(): শুধু loop চালায়, কিছু return করে না। মূল array পরিবর্তন করা যেতে পারে।

3) What is the difference between == and ===?
== : Value check করে, type convert করতে পারে (type coercion)।

=== : Value + Type দুইই check করে, strict comparison।
4) What is the significance of async/await in fetching API data?
Use: API বা asynchronous operation handle করার জন্য।

Significance: কোড synchronous এর মতো readable হয়, promise resolve হওয়া পর্যন্ত অপেক্ষা করে।

5) Explain the concept of Scope in JavaScript (Global, Function, Block).
Global: ফাংশনের বাইরে declare হলে সব জায়গায় accessable।

Function: শুধুমাত্র function এর মধ্যে accessable।

Block (let/const): শুধুমাত্র {} block এর মধ্যে accessable।