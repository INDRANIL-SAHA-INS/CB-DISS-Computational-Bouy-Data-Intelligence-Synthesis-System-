'use client';

import Navbar from '@/app/explore/components/navbar';
import ChatInterface from '@/components/ChatInterface';
import { Book, Download, ExternalLink, Code, Database, Globe } from 'lucide-react';

const documentationSections = [
	{
		title: 'Getting Started',
		icon: <Book className="w-6 h-6" />,
		items: [
			'Introduction to ARGO Floats',
			'Data Access Methods',
			'Quick Start Guide',
			'API Documentation',
		],
	},
	{
		title: 'Data Formats',
		icon: <Database className="w-6 h-6" />,
		items: [
			'NetCDF File Structure',
			'CSV Export Format',
			'Metadata Standards',
			'Quality Control Flags',
		],
	},
	{
		title: 'Technical Specifications',
		icon: <Code className="w-6 h-6" />,
		items: [
			'Float Hardware Specifications',
			'Sensor Calibration',
			'Data Processing Pipeline',
			'Real-time vs Delayed Mode',
		],
	},
	{
		title: 'Global Network',
		icon: <Globe className="w-6 h-6" />,
		items: [
			'International Cooperation',
			'Data Sharing Policies',
			'Contributing Institutions',
			'Regional Programs',
		],
	},
];

const resources = [
	{
		title: 'ARGO Data Management Handbook',
		description:
			'Comprehensive guide to ARGO data management practices and standards.',
		type: 'PDF',
		size: '2.3 MB',
	},
	{
		title: 'Quality Control Procedures',
		description: 'Detailed documentation of quality control procedures for ARGO data.',
		type: 'PDF',
		size: '1.8 MB',
	},
	{
		title: 'API Reference',
		description: 'Complete API documentation for programmatic data access.',
		type: 'HTML',
		size: 'Online',
	},
	{
		title: 'Float Deployment Guidelines',
		description: 'Best practices for ARGO float deployment and maintenance.',
		type: 'PDF',
		size: '3.1 MB',
	},
];

export default function DocumentationPage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />

			<main className="pt-16 pb-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-red-600">
              Our team is dedicated to building this project<br />hold on to us
            </h1>
						
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
						{documentationSections.map((section, index) => (
							<div
								key={index}
								className="bg-card/90 backdrop-blur-md rounded-lg border border-border p-6"
							>
								<div className="flex items-center space-x-3 mb-4">
									<div className="text-accent">{section.icon}</div>
									<h2 className="text-xl font-semibold text-primary">
										{section.title}
									</h2>
								</div>
								<ul className="space-y-2">
									{section.items.map((item, itemIndex) => (
										<li key={itemIndex}>
											<a
												href="#"
												className="text-muted-foreground hover:text-accent transition-colors flex items-center space-x-2"
											>
												<span>•</span>
												<span>{item}</span>
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					<div className="mb-12">
						<h2 className="text-2xl font-bold mb-6 text-center">
							Resources & Downloads
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{resources.map((resource, index) => (
								<div
									key={index}
									className="bg-card/90 backdrop-blur-md rounded-lg border border-border p-6 hover:border-accent/50 transition-colors"
								>
									<div className="flex items-start justify-between mb-3">
										<h3 className="text-lg font-semibold text-primary">
											{resource.title}
										</h3>
										<div className="flex items-center space-x-2">
											<span className="px-2 py-1 bg-accent/30 text-accent text-xs rounded">
												{resource.type}
											</span>
											<span className="text-muted-foreground text-xs">
												{resource.size}
											</span>
										</div>
									</div>
									<p className="text-muted-foreground text-sm mb-4">
										{resource.description}
									</p>
									<div className="flex space-x-2">
										<button className="flex items-center space-x-2 bg-primary hover:bg-accent text-primary-foreground px-4 py-2 rounded-lg transition-colors text-sm">
											<Download className="w-4 h-4" />
											<span>Download</span>
										</button>
										<button className="flex items-center space-x-2 bg-secondary hover:bg-accent text-secondary-foreground px-4 py-2 rounded-lg transition-colors text-sm">
											<ExternalLink className="w-4 h-4" />
											<span>View Online</span>
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="text-center">
						<div className="bg-card/90 backdrop-blur-md rounded-lg border border-border p-8">
							<h2 className="text-2xl font-bold mb-4">Need Help?</h2>
							<p className="text-muted-foreground mb-6">
								Can&apos;t find what you&apos;re looking for? Our AI assistant can
								help you navigate the documentation and answer specific questions
								about ARGO data.
							</p>
							<button className="bg-primary hover:bg-accent text-primary-foreground px-6 py-3 rounded-lg transition-colors">
								Ask the AI Assistant
							</button>
						</div>
					</div>
				</div>
			</main>

			<ChatInterface
				placeholder="Ask about documentation..."
				context="general"
			/>
		</div>
	);
}