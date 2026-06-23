import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { Subject } from 'rxjs';

export const initialCvData = {
  profile: {
    name: 'NAPATWAN CHAIBAN',
    location: 'KHON KAEN, THAILAND',
    phone: '061-628-3810',
    email: 'napatwan.c@kkumail.com',
    summary: 'I am currently a third-year student majoring in Cybersecurity at the College of Computing, Khon Kaen University. seeking an internship in Cybersecurity and IT/Network roles. Familiar with network fundamentals, security assessment, and traffic analysis, with hands-on experience using Wireshark, Burp Suite, Nmap, Metasploit, Linux and basic programming (Python/C). Built projects in IoT security testing, Android malware analysis, and a CTF platform, and ready to contribute while learning across both domains'
  },
  education: [
    {
      institution: 'College Of Computing, Khon Kaen University (KKU)',
      period: 'June 2023 - Present',
      details: 'Bachelor’s Degree in Cybersecurity, GPA 2.78'
    }
  ],
  certifications: [
    {
      name: 'Certified Ethical Hacker (CEH)',
      date: 'April 2026'
    }
  ],
  achievements: [
    { title: 'Networking Essentials', date: 'September 2024', category: 'Cisco Networking Academy' },
    { title: 'CyberOps Associate', date: 'November 2025', category: 'Cisco Networking Academy' },
    { title: 'IT Essentials', date: 'November 2025', category: 'Cisco Networking Academy' },
    { title: 'Junior Cybersecurity Analyst Career Path', date: 'March 2025', category: 'Cisco Networking Academy' },
    { title: 'HCIA-Cloud Computing V5.5(Mock Exam) – Score 1000/1000', date: '', category: 'Huawei Certified ICT Associate' },
    { title: 'HCIP-Datacom – Advanced Routing & Switching Technology V1.0(Mock Exam) – Score 96/100', date: '', category: 'Huawei Certified ICT Associate' },
    { title: 'HCIA-Security (Mock Exam) -Score 960/1000', date: '', category: 'Huawei Certified ICT Associate' }
  ],
  projects: [
    {
      title: 'Adversarial Evasion Evaluation for Hybrid IoT Intrusion Detection Systems',
      code: 'Relevant Code (Python)',
      description: 'Evaluated a hybrid IoT IDS (LightGBM & Isolation Forest) against gray-box evasion attacks using a newly developed Global Search Genetic Algorithm (GSGA). Tested on IoT-23 and Bot-IoT datasets, the study exposed critical vulnerabilities: despite near-perfect baseline performance, the system\'s robust accuracy plummeted to 0.12% (ASR = 99.88%), emphasizing the urgent need for adversarial defenses in real-world IoT environments'
    },
    {
      title: 'Multiplayer Pac-Man Arena Game Development',
      code: 'Relevant Code (GDScript)',
      description: 'Developed a real-time, competitive multiplayer Pac-Man game using the Godot Engine. Implemented a Client-Server architecture to synchronize player states and movement, optimizing network performance for low latency and smooth gameplay'
    },
    {
      title: 'IP Camera Security Analysis and Penetration Testing',
      code: 'Relevant Code (Bash - Security Tools)',
      description: 'Conducted security assessments on IoT devices, focusing on IP cameras. Used Nmap to scan for open RTSP ports and Hydra to perform Brute-force attacks, demonstrating vulnerabilities such as weak credentials and unauthorized video stream access'
    },
    {
      title: 'CTF FIRE: Web-Based Cybersecurity Competition Platform',
      code: 'Relevant Code (JavaScript - Firebase Realtime Database)',
      description: 'Built an educational Capture The Flag (CTF) platform. Developed the frontend with Vue.js for a responsive UI and integrated Firebase for backend services, handling authentication, real-time scoring, and live leaderboards'
    },
    {
      title: 'Dental Clinic Queue Management System',
      code: '',
      description: 'Designed a database-driven appointment management system for a dental clinic, including booking, treatment records, payment details, reporting, and SQL transactions'
    }
  ],
  skills: {
    programming: 'Python, C, Java, JavaScript, GDScript, HTML, CSS, MongoDB',
    tools: 'Godot Engine, Vue.js, Firebase, Nmap, Hydra, Metasploit, Burp Suite, Wireshark, Frida, Jadx-GUI, APKTool, VS Code, Linux (Kali/Ubuntu), Office365'
  },
  socialLinks: {
    github: 'https://github.com/mamanamay',
    linkedin: 'https://www.linkedin.com/in/napatwan-chaiban-436798348/'
  }
};

@Injectable()
export class CvService {
  public updates$ = new Subject<any>();

  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) {}

  async getCv() {
    let cv = await this.cvRepository.findOne({ where: {} });
    if (!cv) {
      cv = this.cvRepository.create({ data: initialCvData });
      await this.cvRepository.save(cv);
    }
    return cv.data;
  }

  async updateCv(updateData: any) {
    let cv = await this.cvRepository.findOne({ where: {} });
    if (!cv) {
      cv = this.cvRepository.create({ data: initialCvData });
    }
    cv.data = updateData;
    await this.cvRepository.save(cv);
    
    // Broadcast update
    this.updates$.next({ data: cv.data });
    
    return cv.data;
  }
}
