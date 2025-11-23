# SisterSafe

**A Privacy-Preserving Location Safety Miniapp for Women**  
_Feminist & Cypherpunk: Maximum Privacy + Self-Sovereignty_

Demo: https://www.loom.com/share/058366b949c34e5687c56976d251afec
Web deployed: https://sistersafe.netlify.app/
---

## 🚩 Core Tech Stack

- **Zero-Knowledge Proofs:** zk-SNARKs, zk-PoL
- **Blockchain:** Celo L2 (alert verification)
- **Identity:** Self Protocol (ZK Proof-of-Personhood)
- **Secure Key Release:** Celo Miniapp logic (encrypted location key shared only with verified contacts)

### **Technical Highlights**
- **zk-PoL for geo-verification** without revealing GPS
- **Confidential compute** Self for safe, programmatic key management
- **Private alerts** Self for on-chain privacy

---

## 💥 Problem Landscape

For women around the world, moving through public spaces—especially alone—comes with a constant calculation of risk. Traditional “safety apps” claim to help, but they require users to hand over their raw GPS location to centralized companies. In practice, this means exchanging personal safety for surveillance, and trusting corporations with extremely sensitive data that can be leaked, abused, or weaponized.

This is not a theoretical risk. Real incidents have shown how exposed women are:

**Real-World Flaws:**
- **Lack of Real Security in Emergencies:** When women disappear, there is often no verifiable trail, no proof something happened, and no urgent response from authorities.
- **Privacy vs Safety Trade-off:** Raw GPS required for help, but shared to third parties and vulnerable.
- **Censorship & Trust Risks:** Centralized alerts can be blocked, delayed, or manipulated.
- **Sybil/Identity Attacks:** Fake accounts can infiltrate “trusted” safety circles.

---

## 🛡️ SisterSafe Solution

SisterSafe removes trust assumptions with a triple-layered approach:

### 1. **Trustless Geo-Proof (zk-PoL)**
- User generates a zk-proof (π) of being “outside safe zone” or having triggered a panic alert.
- **No raw GPS is ever revealed** to anyone—even in emergencies.

### 2. **Confidential Key Release (Celo Miniapp)**
- A location key is released only if the zk-proof is validated on Celo.
Contacts receive the encrypted location only during a confirmed emergency.

### 3. **Sybil-Resistant Trusted Contacts (Self Protocol)**
- Self Protocol ensures that all guardians are verified as real, unique human women—without KYC, without exposing personal identity, and without linking wallet addresses on-chain.
---

## 🎯 Project Objectives

- **Maximize Privacy:** Location stays encrypted until ZK-verified
- **Censorship-Resistance:** All alerts verified on Celo. Alert signal can't be blocked (L2 on-chain verification).
- **Trustless Safety Net:** All contacts cryptographically verified (no fake accounts, no bots).
- **Cross-chain Confidentiality:** ZK-verification on Celo/Self triggers key release on Celo.
- **Mobile-First:** Optimized for women in high-risk environments worldwide

---

## 🌍 Human & Technical Impact

### **Empowerment and Autonomy**
- Users control when and how their location data is shared—never a third party.

### **Safety Net Integrity**
- Only trusted, verified human women can access alerts, ensuring a reliable safety network.

### **Global Accessibility**
- Lightweight, low-cost, mobile-first design on Celo L2 enables use in underbanked and high-risk regions.

---

## 🔗 Philosophical Foundations

> _Privacy as Power. Autonomy as Safety._  
> – Cypherpunk & Feminist Principles
> Inspired by feminist and cypherpunk values: safety enforced by cryptography, not surveillance.

- **Code is Law:** All safety logic enforced by ZK circuits and smart contracts.
- **Data Sovereignty:** Users own their graph, their data, and their choices.
- **Synergistic Security:** Radical privacy is the only route to true safety for vulnerable users.

---

## 🚀 Roadmap & Future Features

We’re focused on delivering a privacy-first safety tool that scales from an MVP to a global protocol.

**Phase 1: Hackathon MVP - (Delivered)**

- ZK-verified panic alert on Celo.

- Self Protocol verification for real, unique women guardians.

- Lightweight mobile-first UI for sending and receiving alerts.

**Phase 2: Proactive Safety Toolsy**

- Configurable Safe Zones with non-emergency “leaving zone” alerts.

- ZK-verified check-ins without exposing the user’s location.

- Guardian groups with custom alert rules.

**Phase 3: Community Layer**

- ZK-backed reputation system for reliable guardians.

- Optional, privacy-preserving aggregated safety insights.

- Local Support Circles: opt-in networks of verified women.

**Phase 4: Protocol Evolution** 

- Governance through a future SisterSafe DAO on Celo.

- Cross-chain ZK interoperability to reach guardians on other networks.

- Optional integration with public safety agencies, preserving user privacy.

---

## 🧑‍💻 Team

- Dayana Farcaster: @Aydamacink.farcaster.eth
- Cristina Farcaster: @tesitoweb3
- Sonia Farcaster: @douxxiie
- Paula Farcaster: @pcorbo.farcaster.eth
- Rocio Farcaster:@rociogonzalezt

--

## SisterSafe - How to run the code

A miniapp to share location safely

A modern Celo blockchain application built with Next.js, TypeScript, and Turborepo.

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment variables:
   
   Create a `.env.local` file in `apps/web/` with:
   ```bash
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_URL=http://localhost:3000
   ```
   
   **Get your WalletConnect Project ID:**
   - Go to [https://cloud.walletconnect.com/](https://cloud.walletconnect.com/)
   - Sign in and create a new project
   - Copy the Project ID and paste it in your `.env.local`

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

This is a monorepo managed by Turborepo with the following structure:

- `apps/web` - Next.js application with embedded UI components and utilities
- `apps/hardhat` - Smart contract development environment

## Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages and apps
- `pnpm type-check` - Run TypeScript type checking

### Smart Contract Scripts

- `pnpm contracts:compile` - Compile smart contracts
- `pnpm contracts:test` - Run smart contract tests
- `pnpm contracts:deploy` - Deploy contracts to local network
- `pnpm contracts:deploy:alfajores` - Deploy to Celo Alfajores testnet
- `pnpm contracts:deploy:sepolia` - Deploy to Celo Sepolia testnet
- `pnpm contracts:deploy:celo` - Deploy to Celo mainnet

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Web3**: Wagmi v2 + RainbowKit (multi-wallet support)
- **Smart Contracts**: Hardhat with Viem
- **Blockchain**: Celo Sepolia Testnet
- **Monorepo**: Turborepo
- **Package Manager**: PNPM

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Celo Documentation](https://docs.celo.org/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
