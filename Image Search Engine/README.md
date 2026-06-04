# 🔍 Image Search Engine (Web Application)

ပြင်ပ API (Application Programming Interface) နှင့် ချိတ်ဆက်ကာ အသုံးပြုသူ အလိုရှိရာ ကီးဝေါ့ဒ် (Keyword) များကို ရိုက်ထည့်ရှာဖွေနိုင်ပြီး အရည်အသွေးမြင့် ပုံရိပ် (High-Quality Images) များကို Real-time ရှာဖွေဖော်ပြပေးသည့် Web Application တစ်ခု ဖြစ်ပါသည်။

---

## 🚀 Features (ပါဝင်သော လုပ်ဆောင်ချက်များ)
* **Keyword-Based Search:** မိမိရှာဖွေလိုသည့် အကြောင်းအရာ (ဥပမာ- Nature, Tech, Cars) ကို ရိုက်ထည့်ရုံဖြင့် သက်ဆိုင်ရာ ပုံများကို တိကျစွာ ရှာဖွေပေးခြင်း။
* **API Integration:** ကမ္ဘာသုံး ပုံလှလှလေးများ စုစည်းရာ API (ဥပမာ- Unsplash API) မှတစ်ဆင့် ဒေတာများကို သန့်ရှင်းသပ်ရပ်စွာ Fetch လုပ်ယူထားခြင်း။
* **Load More Feature:** "Show More" ခလုတ်ကို အသုံးပြုပြီး နောက်ထပ် ရလဒ်အသစ်များကို မူလစာမျက်နှာမပျက်ဘဲ ဆက်တိုက် (Pagination ပုံစံမျိုး) ဆွဲယူဖော်ပြနိုင်ခြင်း။
* **Clean & Modern UI:** ပုံများကို Grid View ပုံစံဖြင့် သပ်ရပ်လှပစွာ နေရာချထားပြီး Hover Effects များ ထည့်သွင်းထားခြင်း။

---

## 🛠️ Technologies Used (အသုံးပြုထားသော နည်းပညာများ)
* **Frontend:** HTML5, CSS3 / Tailwind CSS
* **Asynchronous Logic:** JavaScript (Fetch API, Async/Await)
* **External API:** Unsplash Developer API *(သို့မဟုတ် မိမိသုံးထားသည့် API နာမည် ပြောင်းရေးရန်)*

---

## 💻 How to Run (စမ်းသပ်မောင်းနှင်နည်း)

ဒီ Project ကို မိမိစက်ထဲတွင် ဒေါင်းလုဒ်ဆွဲပြီး `index.html` ဖိုင်ကို Browser တွင် (သို့မဟုတ် Open with Live Server ဖြင့်) တိုက်ရိုက်ဖွင့်လှစ်၍ အသုံးပြုနိုင်ပါသည်။

> **💡 မှတ်ချက်:** API Key လိုအပ်ပါက သတ်မှတ်ထားသော `script.js` (သို့မဟုတ် `.env`) ထဲတွင် မိမိ၏ ကိုယ်ပိုင် API Access Key ကို ထည့်သွင်းပေးရန် လိုအပ်နိုင်ပါသည်။

1. Search Box တွင် မိမိရှာချင်သည့် စာသားကို ရိုက်ထည့်ပါ။
2. "Search" ခလုတ်ကို နှိပ်ပါ သို့မဟုတ် Enter ခေါက်ပါ။
3. ပုံများ ထပ်မံကြည့်ရှုလိုပါက အောက်ခြေရှိ "Show More" ခလုတ်ကို နှိပ်ပါ။