import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Image, ListOrdered, MapPin, Smile } from 'lucide-react';
import Button from './ui/Button';

const CreatePost: React.FC = () => {
    const { userProfile } = useAuth();
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md mb-6">
            <div className="flex items-start space-x-3">
                <img src={userProfile.profilePictureUrl} alt="You" className="w-11 h-11 rounded-full object-cover" />
                <textarea 
                    className="w-full border-0 bg-gray-50 dark:bg-gray-700/50 dark:text-white dark:placeholder-gray-400 rounded-lg p-3 text-base focus:ring-2 focus:ring-blue-500 transition-shadow" 
                    placeholder={`What's on your mind, ${userProfile.name.split(' ')[0]}?`}
                    rows={3}
                ></textarea>
            </div>
            <div className="flex items-center justify-between mt-3 pl-14">
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-500 transition-colors" aria-label="Add Photo or Video">
                        <Image size={20} />
                    </button>
                     <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-500 transition-colors" aria-label="Create Poll">
                        <ListOrdered size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500 transition-colors" aria-label="Tag Location">
                        <MapPin size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-yellow-500 transition-colors" aria-label="Feeling/Activity">
                        <Smile size={20} />
                    </button>
                </div>
                <Button size="md">Post</Button>
            </div>
        </div>
    );
};

export default CreatePost;
