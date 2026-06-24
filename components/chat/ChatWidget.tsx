"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import MessageBubble from "./MessageBubble";

export default function ChatWidget() {
  const [nameInput, setNameInput] = useState("");
const [parentName, setParentName] = useState("");
const [emailInput, setEmailInput] = useState("");
const [parentEmail, setParentEmail] = useState("");
const [phoneInput, setPhoneInput] = useState("");
const [parentPhone, setParentPhone] = useState("");
    const [selectedAge, setSelectedAge] = useState("");
  const [selectedConcern, setSelectedConcern] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("");

  const recommendationReason =
  selectedConcern === "Career Confusion"
    ? "Your child appears to need greater career clarity and direction. A structured career counselling process can help identify suitable career paths."
    : selectedConcern === "Academic Performance"
    ? "A psychometric assessment can help identify learning preferences, strengths and areas for improvement."
    : selectedConcern === "Confidence Issues"
    ? "Understanding personality traits and behavioral patterns can help improve confidence and self-awareness."
    : "Speaking with an expert can help build a personalized study-abroad roadmap.";

const recommendationTitle =
  selectedConcern === "Career Confusion"
    ? "Career Counselling Plan"
    : selectedConcern === "Study Abroad"
    ? "Expert Consultation"
    : "General Psychometric Assessment";
      
const saveLead = async (outcome: string) => {
  console.log("SAVE LEAD CALLED");

  const { data, error } = await supabase
    .from("leads")
    .insert([
      {
        parent_name: parentName,
        email: parentEmail,
        phone: parentPhone,
        child_age: selectedAge,
        concern: selectedConcern,
        outcome,
        recommendation: recommendationTitle,
        source: "Website Chatbot",
      },
    ])
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error(error);
  } else {
  console.log("Lead saved!");

  await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentName,
      email: parentEmail,
      phone: parentPhone,
      concern: selectedConcern,
      outcome,
    }),
  });
}
};
  return (
    <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg border">
      <div className="p-4 border-b">
        <h2 className="font-bold">Parenteva AI Assistant</h2>
      </div>
<div className="px-4 py-2 border-b bg-gray-50 text-sm font-medium">
  Step {
    !parentName
      ? 1
      : !selectedAge
      ? 2
      : !selectedConcern
      ? 3
      : !selectedOutcome
      ? 4
      : 5
  } of 5
</div>
      <div className="h-[600px] overflow-y-auto p-4 space-y-4">

        {/* Age Question */}
        <MessageBubble
  sender="ai"
  message="What is your name?"
/>

{!parentName && (
  <div className="space-y-2">
    <input
      type="text"
      placeholder="Enter your name"
      value={nameInput}
      onChange={(e) => setNameInput(e.target.value)}
      className="border rounded-lg px-4 py-2 w-full"
    />

    <button
      onClick={() => setParentName(nameInput)}
      className="bg-black text-white px-4 py-2 rounded-lg"
    >
      Continue
    </button>
  </div>
)}
{parentName && (
  <MessageBubble
    sender="user"
    message={parentName}
  />
)}
{parentName && !parentEmail && (
  <>
    <MessageBubble
      sender="ai"
      message="What is your email address?"
    />

    <div className="space-y-2">
      <input
        type="email"
        placeholder="Enter your email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full"
      />

      <button
        onClick={() => setParentEmail(emailInput)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Continue
      </button>
    </div>
  </>
)}
{parentEmail && (
  <MessageBubble
    sender="user"
    message={parentEmail}
  />
)}
{parentEmail && !parentPhone && (
  <>
    <MessageBubble
      sender="ai"
      message="What is your phone number?"
    />

    <div className="space-y-2">
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneInput}
        onChange={(e) => setPhoneInput(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full"
      />

      <button
        onClick={() => setParentPhone(phoneInput)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Continue
      </button>
    </div>
  </>
)}
{parentPhone && (
  <MessageBubble
    sender="user"
    message={parentPhone}
  />
)}
        {parentPhone && (
  <MessageBubble
    sender="ai"
    message={`Hi ${parentName}, what is your child's age?`}
  />
)}

        {parentPhone && !selectedAge && (
          <div className="flex flex-wrap gap-2">
            {["5-8", "9-12", "13-15", "16-18", "18+"].map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className="px-4 py-2 border rounded-lg hover:bg-black hover:text-white transition"
              >
                {age}
              </button>
            ))}
          </div>
        )}

        {selectedAge && (
          <MessageBubble sender="user" message={selectedAge} />
        )}

        {/* Concern Question */}
        {selectedAge && (
          <>
            <MessageBubble
              sender="ai"
              message="What is your child's biggest concern?"
            />

            {!selectedConcern && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedConcern("Career Confusion")}
                  className="px-4 py-2 border rounded-lg"
                >
                  Career Confusion
                </button>

                <button
                  onClick={() => setSelectedConcern("Academic Performance")}
                  className="px-4 py-2 border rounded-lg"
                >
                  Academic Performance
                </button>

                <button
                  onClick={() => setSelectedConcern("Confidence Issues")}
                  className="px-4 py-2 border rounded-lg"
                >
                  Confidence Issues
                </button>

                <button
                  onClick={() => setSelectedConcern("Study Abroad")}
                  className="px-4 py-2 border rounded-lg"
                >
                  Study Abroad
                </button>
              </div>
            )}
          </>
        )}

        {selectedConcern && (
          <MessageBubble sender="user" message={selectedConcern} />
        )}

        {/* Outcome Question */}
        {selectedConcern && (
          <>
            <MessageBubble
              sender="ai"
              message="What would you like to achieve?"
            />

            {!selectedOutcome && (
              <div className="flex flex-wrap gap-2">
                <button
  onClick={() => {
    setSelectedOutcome("Career Clarity");
    saveLead("Career Clarity");
  }}
  className="px-4 py-2 border rounded-lg"
>
  Career Clarity
</button>

                <button
  onClick={() => {
    setSelectedOutcome("Better Academic Performance");
    saveLead("Better Academic Performance");
  }}
  className="px-4 py-2 border rounded-lg"
>
  Better Academic Performance
</button>

                <button
  onClick={() => {
    setSelectedOutcome("Study Abroad Guidance");
    saveLead("Study Abroad Guidance");
  }}
  className="px-4 py-2 border rounded-lg"
>
  Study Abroad Guidance
</button>

                <button
  onClick={() => {
    setSelectedOutcome("Confidence Building");
    saveLead("Confidence Building");
  }}
  className="px-4 py-2 border rounded-lg"
>
  Confidence Building
</button>
              </div>
            )}
          </>
        )}

        {selectedOutcome && (
          <MessageBubble sender="user" message={selectedOutcome} />
        )}

        {/* Recommendation */}
        {selectedOutcome && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
            <h3 className="font-bold text-lg">
              Recommended Plan
            </h3>

            <p className="font-medium">
  {recommendationTitle}
</p>

            <p className="text-sm text-gray-700">
              {recommendationReason}
            </p>

            {selectedOutcome === "Career Clarity" && (
              <a
                href="https://parenteva.com/career-counselling-plan/"
                target="_blank"
                className="inline-block bg-black text-white px-4 py-2 rounded-lg"
              >
                Start Career Counselling
              </a>
            )}

            {(selectedOutcome === "Better Academic Performance" ||
              selectedOutcome === "Confidence Building") && (
              <a
                href="https://parenteva.com/general-psyhcometric-assessment/"
                target="_blank"
                className="inline-block bg-black text-white px-4 py-2 rounded-lg"
              >
                Take Assessment
              </a>
            )}

            {selectedOutcome === "Study Abroad Guidance" && (
              <a
                href="https://parenteva.com/our-experts/"
                target="_blank"
                className="inline-block bg-black text-white px-4 py-2 rounded-lg"
              >
                Book Expert
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  );
}