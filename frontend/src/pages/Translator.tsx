import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";

const Translator: React.FC = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translateText = async () => {
    setLoading(true);
    setError("");
    setOutput("");

    const apiKey = "968d131bec8e19c402d72eed42653e7b731119ef";
    const appId = "dev.gndurga555";

    try {
      const response = await fetch("https://revapi.reverieinc.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "REV-API-KEY": apiKey,
          "REV-APP-ID": appId,
          src_lang: "en",
          tgt_lang: targetLang,
          domain: "generic",
          "REV-APPNAME": "localization",
          "REV-APPVERSION": "3.0",
        },
        body: JSON.stringify({
          data: [text],
          nmtMask: true,
          nmtMaskTerms: {},
          enableNmt: true,
          enableLookup: true,
        }),
      });

      const data = await response.json();
      if (data.responseList && data.responseList.length > 0) {
        setOutput(data.responseList[0].outString || "No output received.");
      } else {
        setError("❌ No responseList received.");
      }
    } catch (err: any) {
      console.error("❌ API error:", err);
      setError("❌ API error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <PageHeader
          title="Indian Language Translator"
          description="Translate English text into Indian regional languages like Hindi, Telugu, Tamil, Marathi, Kannada, and Punjabi."
          bgImage="https://images.unsplash.com/photo-1542145953-adbbd4b3f5f3?auto=format&fit=crop&q=80"
        />

        <div className="container-custom py-12">
          <div className="bg-card border rounded-xl shadow-sm p-8 max-w-3xl mx-auto space-y-6">
            <div>
              <label className="block mb-2 font-medium">
                Enter English text:
              </label>
              <textarea
                className="w-full min-h-[120px] rounded-md border border-border bg-background p-4 text-base shadow-sm resize-y"
                placeholder="Type something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Choose Language:</label>
              <select
                className="w-full border border-border bg-background p-2 rounded-md"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="kn">Kannada</option>
                <option value="mr">Marathi</option>
                <option value="pa">Punjabi</option>
              </select>
            </div>

            <Button onClick={translateText} className="w-full">
              {loading ? "Translating..." : "Translate"}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            <div>
              <h3 className="text-lg font-semibold mb-2">Translated Output:</h3>
              <div className="border border-border bg-muted p-4 rounded-md min-h-[80px] whitespace-pre-line">
                {output || "Translation will appear here..."}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Translator;
