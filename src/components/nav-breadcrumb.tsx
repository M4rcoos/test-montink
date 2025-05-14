import React from "react"

interface NavBreadcrumbProps {
    items: { name: string; href?: string }[]
}

export const NavBreadcrumb: React.FC<NavBreadcrumbProps> = ({ items }) => {
    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {item.href ? (
                            <a
                                href={item.href}
                                className="hover:text-gray-700 transition-colors"
                            >
                                {item.name}
                            </a>
                        ) : (
                            <span className="text-gray-800 font-medium">{item.name}</span>
                        )}
                        {index < items.length - 1 && <span className="mx-2">{'>'}</span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
