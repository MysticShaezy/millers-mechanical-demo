// ============================================================================
// Miller Engines & Mechanical — Services Data Layer
// ============================================================================

import {
  Activity,
  ShieldCheck,
  BookOpen,
  ThermometerSnowflake,
  Disc3,
  CarFront,
  Cpu,
  Paintbrush,
} from "lucide-react";
import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "diagnosis",
    title: "Vehicle Diagnosis",
    shortDescription:
      "Expert vehicle diagnosis in Toowoomba, helping you get to the root of the problem quickly and accurately.",
    longDescription: `Modern vehicles are equipped with complex systems designed to improve performance, efficiency, and safety. When something goes wrong, your car often tries to tell you through warning lights, strange noises, reduced performance, or poor fuel economy.

At Miller Engines and Mechanical, we specialise in expert vehicle diagnosis in Toowoomba, helping you get to the root of the problem quickly and accurately.

Our workshop uses advanced diagnostic scan tools and the knowledge of highly experienced technicians to pinpoint issues in your engine, transmission, exhaust, brakes, electrical systems, and more. Whether it's a minor sensor fault or a major mechanical issue, we'll find it and fix it.

**What is Vehicle Diagnosis?**

Vehicle diagnosis is the process of identifying the source of a problem in your car using a combination of digital tools, mechanical inspections, and technician expertise.`,
    icon: Activity,
    features: [
      "OBD-II scanners and live data analysis",
      "Modern diagnostic platforms",
      "Engine, transmission, ABS, airbag diagnostics",
      "Climate control and electrical fault finding",
      "Honest communication we explain before we repair",
      "No unnecessary repairs we fix what needs fixing",
    ],
    faq: [
      {
        question: "How long does a vehicle diagnosis take?",
        answer:
          "Most diagnostic checks are completed within 30-60 minutes. Complex electrical or intermittent issues may take longer.",
      },
      {
        question: "Do I need a diagnosis if my check engine light is on?",
        answer:
          "Yes. A check engine light can indicate anything from a loose fuel cap to a serious engine issue. A proper scan will identify the exact fault code.",
      },
      {
        question: "How much does a diagnostic scan cost?",
        answer:
          "Contact us for our current diagnostic scan pricing. If you proceed with repairs, the diagnostic fee is often absorbed into the repair cost.",
      },
    ],
    metaTitle: "Vehicle Diagnosis Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Professional vehicle diagnosis in Toowoomba. Advanced scan tools, experienced technicians. Get to the root of the problem quickly. Call +61 7 4633 2417.",
  },
  {
    slug: "brake-repairs",
    title: "Brake Repairs",
    shortDescription:
      "Comprehensive brake inspections and repairs to ensure your maximum safety on the road.",
    longDescription: `Your brakes are your vehicle's most critical safety system. At Miller Engines and Mechanical, we provide thorough brake inspections, repairs, and replacements to keep you and your family safe.

From squealing brakes to a spongy pedal, we diagnose and fix all brake issues with precision. We service disc brakes, drum brakes, brake pads, rotors, callipers, brake lines, and master cylinders across all vehicle makes and models.

Our technicians will always inspect your braking system as part of any service and let you know if attention is needed before it becomes a safety risk.`,
    icon: ShieldCheck,
    features: [
      "Disc and drum brake servicing",
      "Brake pad and rotor replacement",
      "Calliper rebuilds and replacements",
      "Brake fluid flush and bleeding",
      "Handbrake adjustments",
      "ABS system diagnostics",
    ],
    faq: [
      {
        question: "How do I know if my brakes need replacing?",
        answer:
          "Common signs include squealing or grinding noises, a spongy brake pedal, the vehicle pulling to one side when braking, or a dashboard brake warning light.",
      },
      {
        question: "How often should brakes be inspected?",
        answer:
          "We recommend a brake inspection every 12 months or 20,000km whichever comes first.",
      },
    ],
    metaTitle: "Brake Repairs Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Expert brake repairs and inspections in Toowoomba. Disc brakes, drum brakes, pads, rotors and more. Safety first. Call +61 7 4633 2417.",
  },
  {
    slug: "logbook-services",
    title: "Logbook Servicing",
    shortDescription:
      "Maintain your new car warranty with our professional logbook servicing.",
    longDescription: `Keep your vehicle running at its best and maintain your manufacturer's warranty with our logbook servicing. At Miller Engines and Mechanical, we perform all scheduled maintenance items specified in your vehicle's service manual.

Our logbook services cover all makes and models and are stamped in your logbook to keep your warranty intact. We use quality parts and fluids that meet or exceed manufacturer specifications.

Whether your vehicle is brand new or a few years old, regular servicing is the best way to prevent costly repairs and maintain your vehicle's value.`,
    icon: BookOpen,
    features: [
      "All makes and models serviced",
      "Manufacturer warranty maintained",
      "Service logbook stamped",
      "Quality parts and fluids used",
      "Multi-point safety inspection included",
      "Service reminders available",
    ],
    faq: [
      {
        question: "Will servicing at your workshop void my new car warranty?",
        answer:
          "No. Australian Consumer Law protects your right to have your vehicle serviced by any qualified mechanic without voiding the manufacturer's warranty, as long as the work meets manufacturer specifications.",
      },
      {
        question: "How often should I get my car serviced?",
        answer:
          "Most manufacturers recommend servicing every 12 months or 15,000km whichever comes first. Check your owner's manual for your specific interval.",
      },
    ],
    metaTitle: "Logbook Servicing Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Professional logbook servicing in Toowoomba. Maintain your new car warranty. All makes and models. Call +61 7 4633 2417.",
  },
  {
    slug: "air-con",
    title: "Air Conditioning Regas",
    shortDescription:
      "Keep cool in summer with complete air conditioning regas and repairs.",
    longDescription: `Queensland summers are brutal don't get caught with a failing air conditioning system. At Miller Engines and Mechanical, we offer complete automotive air conditioning services including regas, leak detection, and component repairs.

If your A/C isn't blowing cold, is making unusual noises, or has a strange smell, we'll diagnose the issue and get your system working efficiently again.

We service all vehicle A/C systems and use quality refrigerant to manufacturer specifications.`,
    icon: ThermometerSnowflake,
    features: [
      "Full air conditioning regas",
      "Leak detection and repair",
      "Compressor diagnostics",
      "Cabin filter replacement",
      "System performance testing",
      "All vehicle makes and models",
    ],
    faq: [
      {
        question: "How often does car A/C need a regas?",
        answer:
          "Most vehicles benefit from an A/C regas every 2-3 years, or sooner if you notice reduced cooling performance.",
      },
      {
        question: "Why does my car A/C smell bad?",
        answer:
          "A musty smell usually indicates mould or bacteria growth in the evaporator. We can clean the system and replace your cabin filter to eliminate the odour.",
      },
    ],
    metaTitle:
      "Air Conditioning Regas Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Car air conditioning regas and repairs in Toowoomba. Beat the Queensland heat. Expert A/C servicing. Call +61 7 4633 2417.",
  },
  {
    slug: "clutch",
    title: "Clutch Replacements",
    shortDescription:
      "Expert clutch diagnosis, repair, and replacement for manual vehicles.",
    longDescription: `A worn or failing clutch can make your vehicle difficult and unsafe to drive. At Miller Engines and Mechanical, we have extensive experience diagnosing and replacing clutches across all manual transmission vehicles.

Common signs of clutch wear include slipping (engine revs rise without acceleration), difficulty changing gears, a chattering or juddering pedal, and unusual noises when pressing or releasing the clutch.

We use quality clutch kits and ensure your flywheel is inspected and machined or replaced if necessary.`,
    icon: Disc3,
    features: [
      "Complete clutch kit replacement",
      "Flywheel inspection and machining",
      "Hydraulic clutch system repairs",
      "Clutch cable adjustments",
      "Dual-mass flywheel servicing",
      "All manual transmission vehicles",
    ],
    faq: [
      {
        question: "How long does a clutch replacement take?",
        answer:
          "Most clutch replacements are completed within one working day. Some vehicles with complex drivetrains may require additional time.",
      },
      {
        question: "How do I know if my clutch is going?",
        answer:
          "Signs include slipping (RPMs rise without matching acceleration), difficulty selecting gears, a high biting point, and a burning smell during driving.",
      },
    ],
    metaTitle: "Clutch Replacement Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Expert clutch replacement and repair in Toowoomba. All manual vehicles. Quality parts, guaranteed workmanship. Call +61 7 4633 2417.",
  },
  {
    slug: "suspension",
    title: "Suspension & Steering",
    shortDescription:
      "Complete suspension and steering repairs for a smooth, safe ride.",
    longDescription: `Your suspension and steering systems are essential for vehicle handling, ride comfort, and tyre wear. At Miller Engines and Mechanical, we diagnose and repair all suspension and steering issues.

If your vehicle is pulling to one side, bouncing excessively, making clunking noises over bumps, or your steering feels loose or heavy, it's time for an inspection.

We service shock absorbers, struts, control arms, ball joints, tie rod ends, power steering systems, and more.`,
    icon: CarFront,
    features: [
      "Shock absorber and strut replacement",
      "Control arm and ball joint repairs",
      "Tie rod end replacement",
      "Power steering repairs",
      "Wheel alignment recommendations",
      "Spring and bush replacements",
    ],
    faq: [
      {
        question: "How do I know if my shocks are worn?",
        answer:
          "Excessive bouncing after bumps, nose-diving under braking, uneven tyre wear, and a generally uncomfortable ride are all signs of worn shock absorbers.",
      },
      {
        question: "Does suspension work affect wheel alignment?",
        answer:
          "Yes. After most suspension repairs, we recommend a wheel alignment to ensure even tyre wear and proper handling.",
      },
    ],
    metaTitle: "Suspension & Steering Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Suspension and steering repairs in Toowoomba. Shocks, struts, ball joints, power steering and more. Call +61 7 4633 2417.",
  },
  {
    slug: "engine-diagnostics",
    title: "Engine Diagnostics",
    shortDescription:
      "Advanced engine diagnostics to identify and resolve performance issues.",
    longDescription: `When your engine isn't performing as it should, our advanced diagnostic equipment can quickly identify the source of the problem. At Miller Engines and Mechanical, engine diagnostics is one of our core specialties.

We use manufacturer-grade scanning tools to read fault codes, analyse live sensor data, and perform component-level testing. This allows us to accurately diagnose issues that other workshops may miss.

From misfires and rough idling to power loss and excessive fuel consumption, we'll get your engine running right.`,
    icon: Cpu,
    features: [
      "Manufacturer-grade scanning tools",
      "Live sensor data analysis",
      "Fault code reading and interpretation",
      "Component-level testing",
      "Misfire and performance diagnosis",
      "Fuel system diagnostics",
    ],
    faq: [
      {
        question: "What's the difference between vehicle diagnosis and engine diagnostics?",
        answer:
          "Vehicle diagnosis covers all vehicle systems (brakes, electrical, A/C, etc.), while engine diagnostics focuses specifically on the engine and its supporting systems like fuel injection, ignition, and emissions.",
      },
      {
        question: "Can you diagnose issues other workshops couldn't find?",
        answer:
          "Yes. Our advanced diagnostic tools and experienced technicians regularly identify issues that general workshops may not have the equipment or expertise to find.",
      },
    ],
    metaTitle: "Engine Diagnostics Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Advanced engine diagnostics in Toowoomba. Expert fault finding with manufacturer-grade tools. Call +61 7 4633 2417.",
  },
  {
    slug: "custom-vinyl",
    title: "Custom Vinyl",
    shortDescription:
      "Professional custom vinyl wraps and decals for vehicles.",
    longDescription: `Looking to personalise your vehicle or protect its paintwork? Miller Engines and Mechanical offers professional custom vinyl services.

From full colour changes and racing stripes to business signage and paint protection film, we deliver quality vinyl applications that transform your vehicle's appearance.

Our vinyl work is precision-cut and professionally applied for a seamless, factory-quality finish.`,
    icon: Paintbrush,
    features: [
      "Custom vinyl wraps",
      "Racing stripes and decals",
      "Business vehicle signage",
      "Paint protection film",
      "Colour change wraps",
      "Precision cutting and application",
    ],
    faq: [
      {
        question: "How long does vinyl wrap last?",
        answer:
          "Quality vinyl wraps typically last 5-7 years with proper care. Paint protection film can last even longer.",
      },
      {
        question: "Will vinyl damage my paint?",
        answer:
          "No. When professionally applied and removed, quality vinyl actually protects your original paint. We use premium materials that won't leave residue.",
      },
    ],
    metaTitle: "Custom Vinyl Wraps Toowoomba | Miller Engines & Mechanical",
    metaDescription:
      "Custom vinyl wraps, decals and paint protection in Toowoomba. Professional application, premium materials. Call +61 7 4633 2417.",
  },
];

/** Find a service by its slug */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Get all service slugs for static generation */
export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
