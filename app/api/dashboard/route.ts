import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = {
    stats: [
      { id: "total-users", label: "TOTAL USERS", value: "14,285", change: "+ 12%", status: "up", color: "blue" },
      { id: "active-users", label: "ACTIVE USERS", value: "8,912", change: "+ 12%", status: "up", color: "purple" },
      { id: "total-protocols", label: "TOTAL PROTOCOLS", value: "412", change: "+ 12%", status: "up", color: "emerald" },
      { id: "total-exercises", label: "TOTAL EXERCISES", value: "2,854", change: "+ 12%", status: "up", color: "blue" }
    ],
    chartData: [
      { date: "01 OCT", value: 100, height: "45%", isHighlighted: false },
      { date: "02 OCT", value: 120, height: "55%", isHighlighted: false },
      { date: "03 OCT", value: 80, height: "35%", isHighlighted: false },
      { date: "04 OCT", value: 110, height: "48%", isHighlighted: false },
      { date: "05 OCT", value: 95, height: "42%", isHighlighted: false },
      { date: "06 OCT", value: 130, height: "58%", isHighlighted: false },
      { date: "07 OCT", value: 122, height: "52%", isHighlighted: false },
      { date: "08 OCT", value: 150, height: "68%", isHighlighted: false },
      { date: "09 OCT", value: 105, height: "46%", isHighlighted: false },
      { date: "10 OCT", value: 140, height: "62%", isHighlighted: false },
      { date: "11 OCT", value: 90, height: "38%", isHighlighted: false },
      { date: "12 OCT", value: 125, height: "54%", isHighlighted: false },
      { date: "13 OCT", value: 100, height: "44%", isHighlighted: false },
      { date: "14 OCT", value: 190, height: "88%", isHighlighted: true }
    ],
    tableData: [
      { date: "14 Oct 2024", totalSessions: "152", activeSessions: "128", completion: "94%" },
      { date: "13 Oct 2024", totalSessions: "114", activeSessions: "98", completion: "88%" },
      { date: "12 Oct 2024", totalSessions: "108", activeSessions: "84", completion: "82%" }
    ],
    activities: [
      { id: 1, user: "Elena Rossi", avatar: "/user.png", tag: "NEW SUBSCRIPTION", action: "Joined Pro Membership Plan", location: "LONDON, UK", time: "2 minutes ago" },
      { id: 2, user: "Marcus Chen", avatar: "/user.png", tag: "ACTIVITY LOG", action: "Completed &quot;The Lumbar Deep Reset&quot; Protocol", location: "LEVEL UP", time: "15 minutes ago" }
    ]
  };

  return NextResponse.json(data);
}
