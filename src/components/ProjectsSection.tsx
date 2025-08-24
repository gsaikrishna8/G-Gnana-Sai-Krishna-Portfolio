import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Github, Loader2, RefreshCw, Filter, X } from 'lucide-react';
import { ProjectCard } from '@/components/ProjectCard';
import { githubService } from '@/services/github';
import { toast } from '@/components/ui/use-toast';

const DEFAULT_DISPLAY_COUNT = 6;

export const ProjectsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const {
    data: repositories = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['github-repositories'],
    queryFn: () => githubService.fetchRepositories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });

  // Get all unique languages for filter
  const availableLanguages = useMemo(() => {
    const languages = repositories
      .map(repo => repo.language)
      .filter(Boolean)
      .filter((lang, index, arr) => arr.indexOf(lang) === index)
      .sort();
    return languages as string[];
  }, [repositories]);

  // Filter repositories based on search and language
  const filteredRepositories = useMemo(() => {
    let filtered = repositories;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(query) ||
        repo.description?.toLowerCase().includes(query) ||
        repo.language?.toLowerCase().includes(query) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }

    // Apply language filter
    if (selectedLanguage) {
      filtered = filtered.filter(repo => repo.language === selectedLanguage);
    }

    return filtered;
  }, [repositories, searchQuery, selectedLanguage]);

  const displayedRepositories = showAll 
    ? filteredRepositories 
    : filteredRepositories.slice(0, DEFAULT_DISPLAY_COUNT);

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing projects...",
      description: "Fetching the latest repositories from GitHub",
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('');
    setShowAll(false);
  };

  const hasActiveFilters = searchQuery.trim() || selectedLanguage;

  if (isError) {
    return (
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              🚀 GitHub Projects
            </h2>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-destructive mb-4">
                Failed to load repositories: {error instanceof Error ? error.message : 'Unknown error'}
              </p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🚀 GitHub Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Automatically synced from my GitHub repositories. These projects showcase my work in full-stack development, 
            cloud infrastructure, and modern web technologies.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, languages, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm border-border/50"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isFetching}
                className="gap-2"
              >
                {isFetching ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
                Refresh
              </Button>
            </div>
          </div>

          {/* Language Filter */}
          {availableLanguages.length > 0 && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span>Filter by language:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedLanguage === '' ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedLanguage('')}
                >
                  All
                </Badge>
                {availableLanguages.map((language) => (
                  <Badge
                    key={language}
                    variant={selectedLanguage === language ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-muted-foreground">
            {isLoading ? (
              'Loading repositories...'
            ) : (
              `Showing ${displayedRepositories.length} of ${filteredRepositories.length} projects`
            )}
          </p>
          
          {repositories.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Github className="h-4 w-4" />
              <span>Live from GitHub</span>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : filteredRepositories.length === 0 ? (
          <div className="text-center py-16">
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground">
                {hasActiveFilters ? 'No projects match your search criteria' : 'No repositories found'}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedRepositories.map((repository) => (
                <ProjectCard key={repository.id} repository={repository} />
              ))}
            </div>

            {/* Show More/Less Button */}
            {filteredRepositories.length > DEFAULT_DISPLAY_COUNT && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
                >
                  {showAll ? 'Show Less' : `Show More (${filteredRepositories.length - DEFAULT_DISPLAY_COUNT} more)`}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};