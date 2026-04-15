import { MapPin, Code2, ExternalLink, MessageSquare, Layers } from 'lucide-react';
import vrajLinkedInPhoto from '@/assets/images/vraj-gangani-linkedin-profile.png';

const PROFILE_SOURCE = 'https://indiepa.ge/vrajgangani';

const PROJECTS = [
  {
    title: 'Inprofile',
    description: 'A product focused on profiles and professional presence — explore the live site.',
    href: 'https://inprofile.co/',
    icon: Layers,
    accent: '#2563EB',
    accentBg: '#EFF6FF',
  },
  {
    title: 'Matespace',
    description: 'A chat application built without traditional authentication — fast to try, minimal friction.',
    href: 'https://matespace.web.app/',
    icon: MessageSquare,
    accent: '#7C3AED',
    accentBg: '#F5F3FF',
  },
] as const;

export default function VrajPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="h-[52px] border-b border-[#E5E7EB] flex items-center px-6 flex-shrink-0 bg-white">
        <h1 className="text-[20px] font-semibold text-[#111827]">Vraj</h1>
      </div>

      <div className="flex-1 overflow-auto">
        <div
          className="min-h-full relative"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(124, 58, 237, 0.08), transparent 50%), #FAFBFC',
          }}
        >
          <div className="max-w-[720px] mx-auto px-6 py-10 pb-14">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_12px_40px_-12px_rgba(37,99,235,0.15)] overflow-hidden">
              <div
                className="h-[140px] sm:h-[168px] relative bg-[#1E3A5F] bg-cover bg-center"
                style={{ backgroundImage: `url(${vrajLinkedInPhoto})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#1E40AF]/35 to-transparent" />
                <div className="absolute inset-0 opacity-25 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
              </div>

              <div className="px-6 sm:px-8 pb-8 -mt-14 relative">
                <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-[112px] h-[112px] rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-[#E5E7EB] ring-1 ring-black/[0.06]">
                      <img
                        src={vrajLinkedInPhoto}
                        alt="Vraj Gangani"
                        className="w-full h-full object-cover object-[center_22%]"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <h2 className="text-[22px] sm:text-[24px] font-semibold text-[#111827] tracking-tight">
                      Vraj Gangani
                    </h2>
                    <p className="text-[14px] text-[#4B5563] mt-1 flex items-center gap-1.5 flex-wrap">
                      <Code2 size={15} className="text-[#6B7280] flex-shrink-0" />
                      <span>Software engineer</span>
                    </p>
                    <p className="text-[13px] text-[#6B7280] mt-2 flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#9CA3AF] flex-shrink-0" />
                      Surat, Gujarat, India
                    </p>
                  </div>
                </div>

                <p className="text-[14px] text-[#374151] leading-relaxed mt-8 max-w-[560px]">
                  Builder of practical web products — from profile tooling to real-time chat experiences. Based in
                  Surat and shipping projects that prioritize clarity and a smooth first-time user experience.
                </p>

                <div className="mt-8">
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-4">
                    Featured projects
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PROJECTS.map((project) => {
                      const Icon = project.icon;
                      return (
                        <a
                          key={project.title}
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block p-5 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] hover:bg-white hover:border-[#D1D5DB] hover:shadow-md transition-all duration-200"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-105"
                            style={{ backgroundColor: project.accentBg }}
                          >
                            <Icon size={18} style={{ color: project.accent }} />
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-[15px] font-semibold text-[#111827]">{project.title}</h4>
                            <ExternalLink
                              size={16}
                              className="text-[#9CA3AF] flex-shrink-0 mt-0.5 group-hover:text-[#2563EB] transition-colors"
                            />
                          </div>
                          <p className="text-[13px] text-[#6B7280] leading-relaxed mt-2">{project.description}</p>
                          <span
                            className="inline-flex items-center gap-1 mt-4 text-[13px] font-medium"
                            style={{ color: project.accent }}
                          >
                            Open project
                            <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-[#F3F4F6]">
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">Connect</h3>
                  <a
                    href="https://instagram.com/vraj.gangani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    Instagram @vraj.gangani
                    <ExternalLink size={14} className="opacity-70" />
                  </a>
                </div>

                <p className="text-[11px] text-[#9CA3AF] mt-10 leading-relaxed">
                  Photo is the LinkedIn profile graphic published on{' '}
                  <a
                    href={PROFILE_SOURCE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B7280] hover:text-[#2563EB] underline underline-offset-2"
                  >
                    Indie Page
                  </a>
                  . Other details summarized there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
