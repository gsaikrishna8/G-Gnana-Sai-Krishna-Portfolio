import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, GitFork, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { GitHubRepository, githubService } from '@/services/github';

interface ProjectCardProps {
  repository: GitHubRepository;
}

export const ProjectCard = ({ repository }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const languageColor = githubService.getLanguageColor(repository.language);
  const formattedDate = githubService.formatDate(repository.updated_at);
  
  const hasExtendedContent = repository.topics.length > 0;

  return (
    <Card className="group h-full flex flex-col rounded-2xl shadow-elegant hover:shadow-glow transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-border/50 overflow-hidden">
      <div className="p-6 flex-1 flex flex-col">
        {/* Header with language and external link */}
        <div className="flex items-center justify-between mb-4">
          {repository.language && (
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: languageColor }}
              />
              <span className="text-sm font-medium text-muted-foreground">
                {repository.language}
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open(repository.html_url, '_blank')}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 h-auto"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </Button>
        </div>

        {/* Project title */}
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
          {repository.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </h3>

        {/* Description */}
        {repository.description && (
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
            {repository.description}
          </p>
        )}

        {/* Topics */}
        {repository.topics.length > 0 && (
          <div className={`mb-4 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="flex flex-wrap gap-1">
              {repository.topics.slice(0, 5).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="text-xs px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {topic}
                </Badge>
              ))}
              {repository.topics.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{repository.topics.length - 5}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{repository.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              <span>{repository.forks_count}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            onClick={() => window.open(repository.html_url, '_blank')}
            className="text-primary hover:text-primary/80 font-medium text-sm p-0 h-auto"
          >
            View Repository →
          </Button>
          
          {hasExtendedContent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-auto text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};