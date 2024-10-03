
      document.getElementById('text3').innerText = `Dear Home Depot Shopper,`;
      document.getElementById('text32').innerText = `This website is not affiliated with or endorsed by Home Depot or any similar brand and does not claim to represent or own any of the trademarks, trade names or rights associated with any of the products which are the property of their respective owners who do not own, endorse, or promote this website.`;

      var qtexxtt = [
    "When you think of Home Depot, which word comes to mind first?",
    "Reliability",
    "Innovation",
    "Affordability",
    "Variety",
    "How do Home Depot advertisements influence your shopping decisions?",
    "Strongly influence",
    "Somewhat influence",
    "Rarely influence",
    "No influence at all",
    "What is your primary reason for shopping at Home Depot?",
    "Product quality",
    "Customer service",
    "Store ambiance",
    "Loyalty rewards",
    "How often do you use automotive safety kits in your vehicle?",
    "Regularly",
    "Occasionally",
    "Rarely",
    "Never",
    "What feature of the Kitgo 137 Piece Automotive Safety Kit excites you the most?",
    "Comprehensive safety tools",
    "Compact and easy to store",
    "Emergency preparedness items",
    "High-quality materials",
    "How likely are you to participate in a Home Depot promotional giveaway?",
    "Very likely",
    "Somewhat likely",
    "Not very likely",
    "Not at all likely",
    "If you won the Kitgo 137 Piece Automotive Safety Kit, how would you use it?",
    "Keep it in your vehicle for emergencies",
    "Gift it to a friend or family member",
    "Use it for outdoor activities and road trips",
    "Not sure/I wouldn't use it",
    "Which aspect of Home Depot shopping experience would you most like to see improved?",
    "Online shopping platform",
    "In-store product assortment",
    "Customer service responsiveness",
    "Price competitiveness",
    "How does owning a comprehensive automotive safety kit like the Kitgo 137 Piece set align with your vehicle preparedness needs?",
    "Perfectly aligns",
    "Somewhat aligns",
    "Barely aligns",
    "Does not align at all",
    "After hearing about the Kitgo 137 Piece Automotive Safety Kit giveaway, how does your perception of Home Depot change?",
    "Much more positive",
    "Slightly more positive",
    "No change",
    "Less positive"
];

      const qhed = document.querySelectorAll(".qeus-head") || [];
      const ques = document.querySelectorAll(".qeus-text") || [];
      const qnum = document.querySelectorAll(".qeus-numb") || [];

      for (var qn = 0; qn < qnum.length; qn++) {
          qhed[qn].innerText = `Home Depot Shopper Experience Survey`;
          qnum[qn].innerText = "Question " + (qn + 1) + " on " + qnum.length + ":";
      }

      var dsq = 0;
      while (dsq < qtexxtt.length) {
          ques[dsq].innerText = qtexxtt[dsq];
          dsq++;
      }
    