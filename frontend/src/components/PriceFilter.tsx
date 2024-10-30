type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Tùy chọn giá phòng</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice}
                onChange={(event) =>
                    onChange(
                        event.target.value ? parseInt(event.target.value) : undefined
                    )
                }
            >
                <option value="">Chọn giá</option>
                {[1000000, 2000000, 5000000, 8000000, 10000000, 20000000].map((price) => (
                    <option value={price}>{price}</option>
                ))}
            </select>
        </div>
    );
};

export default PriceFilter;
